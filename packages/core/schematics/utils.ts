import {Path} from '@angular-devkit/core';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getDecoratorMetadata, getMetadataField, insertImport } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

export function getLibraryVersion() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
  ).version;
}

export function addPackageToPackageJson(
  host: Tree,
  pkg: string,
  version: string
): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

function sortObjectByKeys(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

export function getProjectMainFile(project: WorkspaceProject): Path {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.main) {
    throw new SchematicsException(`Could not find the project main file inside of the ` +
        `workspace config (${project.sourceRoot})`);
  }

  return buildOptions.main;
}

/** Resolves the architect options for the build target of the given project. */
function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string) {
  const retVal = project?.targets?.[buildTarget]?.options ?? project?.architect?.[buildTarget]?.options;
  if (!retVal) {
    throw new SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
  }
  return retVal;
}

/** Import and add module to root app module. */
export function addModuleImportToRootModule(host: Tree, rootModulePath: string, moduleName: string, moduleSrc: string,
                                            moduleImport: string) {
  const moduleSource = parseSourceFile(host, rootModulePath);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${rootModulePath}`);
  }

  const changes = addImportToModule(moduleSource, rootModulePath, moduleName, moduleSrc, moduleImport);
  const recorder = host.beginUpdate(rootModulePath);

  changes.forEach((change) => {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  });

  host.commitUpdate(recorder);
}

/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
export function getProjectFromWorkspace(workspace: WorkspaceSchema, projectName?: string) {
  const project = workspace.projects[projectName ?? workspace.defaultProject!];

  if (!project) {
    throw new SchematicsException(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}

/** Reads file given path and returns TypeScript source file. */
function parseSourceFile(host: Tree, filePath: string): ts.SourceFile {
  const buffer = host.read(filePath);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${filePath}`);
  }
  return ts.createSourceFile(filePath, buffer.toString(), ts.ScriptTarget.Latest, true);
}

function addImportToModule(source: ts.SourceFile,
                           ngModulePath: string, symbolName: string,
                           importPath: string, importSource: string): Change[] {
    const metadataField = 'imports';
    const nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
    let node: any = nodes[0];  // tslint:disable-line:no-any

    // Find the decorator declaration.
    if (!node) {
      return [];
    }

    // Get all the children property assignment of object literals.
    const matchingProperties = getMetadataField(
      node as ts.ObjectLiteralExpression,
      metadataField,
    );

    // Get the last node of the array literal.
    if (!matchingProperties) {
      return [];
    }

    if (matchingProperties.length === 0) {
      // We haven't found the field in the metadata declaration. Insert a new field.
      const expr = node as ts.ObjectLiteralExpression;
      let position: number;
      let toInsert: string;
      if (expr.properties.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = `  ${metadataField}: [${importSource}]\n`;
      } else {
        node = expr.properties[expr.properties.length - 1];
        position = node.getEnd();
        // Get the indentation of the last element, if any.
        const text = node.getFullText(source);
        const matches = text.match(/^\r?\n\s*/);
        if (matches && matches.length > 0) {
          toInsert = `,${matches[0]}${metadataField}: [${importSource.replace(/\n/g, matches[0])}]`;
        } else {
          toInsert = `, ${metadataField}: [${importSource}]`;
        }
      }
      if (importPath !== null) {
        return [
          new InsertChange(ngModulePath, position, toInsert),
          insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath),
        ];
      } else {
        return [new InsertChange(ngModulePath, position, toInsert)];
      }
    }
    const assignment = matchingProperties[0] as ts.PropertyAssignment;

    // If it's not an array, nothing we can do really.
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
      return [];
    }

    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (arrLiteral.elements.length === 0) {
      // Forward the property.
      node = arrLiteral;
    } else {
      node = arrLiteral.elements;
    }

    if (!node) {
      // tslint:disable-next-line: no-console
      console.error('No app module found. Please add your new class to your component.');

      return [];
    }

    if (Array.isArray(node)) {
      const nodeArray = node as {} as Array<ts.Node>;
      const symbolsArray = nodeArray.map(node => node.getText());
      if (symbolsArray.map(symbol => symbol.split('.')[0]).includes(symbolName)) {
        return [];
      }

      node = node[node.length - 1];
    }

    let toInsert: string;
    let position = node.getEnd();
    if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
      // We haven't found the field in the metadata declaration. Insert a new
      // field.
      const expr = node as ts.ObjectLiteralExpression;
      if (expr.properties.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = `  ${importSource}\n`;
      } else {
        // Get the indentation of the last element, if any.
        const text = node.getFullText(source);
        if (text.match(/^\r?\r?\n/)) {
          const match = text.match(/^\r?\n\s*/)[0];
          toInsert = `,${match}${importSource.replace(/\n/g, match)}`;
        } else {
          toInsert = `, ${importSource}`;
        }
      }
    } else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
      // We found the field but it's empty. Insert it just before the `]`.
      position--;
      toInsert = `${importSource}`;
    } else {
      // Get the indentation of the last element, if any.
      const text = node.getFullText(source);
      if (text.match(/^\r?\n/)) {
        const match = text.match(/^\r?\n(\r?)\s*/)[0];
        toInsert = `,${match}${importSource.replace(/\n/g, match)}`;
      } else {
        toInsert = `, ${importSource}`;
      }
    }

    if (importPath !== null) {
      return [
        new InsertChange(ngModulePath, position, toInsert),
        insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath),
      ];
    } else {
      return [new InsertChange(ngModulePath, position, toInsert)];
    }
}
