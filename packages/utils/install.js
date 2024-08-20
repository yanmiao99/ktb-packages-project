import { each } from 'lodash-es';

/**
 * 为组件添加install方法
 * @param {*} components
 * @returns
 */

export function makeInstaller(components) {
  const installer = app => {
    each(components, c => app.use(c))
  }
  return installer
}


/**
 * 为组件添加install方法
 * @param {*} components
 * @returns
 */

export const withInstall = (component) => {
  component.install = (app) => {
    const name = (component)?.name || "UnnamedComponent";
    app.component(name, component);
  };
  return component ;
};

