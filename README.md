<img src=".github/assets/rainbow_separator.svg" />

&nbsp;

<a href="https://github.com/neo-florescence/neo-expensive">
  <div align="center">
    <img src=".github/assets/logo.png" height="37" />
    <img width="212px" src=".github/assets/custom_logo.svg" />
  </div>
</a>

<img src=".github/assets/invisible.svg" />

<img src=".github/assets/rainbow_separator.svg" />

<div align="center">
  <img src="https://img.shields.io/github/repo-size/neo-florescence/neo-expensive?style=for-the-badge" />
  <img src="https://img.shields.io/github/languages/count/neo-florescence/neo-expensive?style=for-the-badge" />

  <a href="https://github.com/neo-florescence/neo-expensive/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/neo-florescence/neo-expensive?style=for-the-badge" />
  </a>

  <a href="https://github.com/neo-florescence/neo-expensive/releases/latest">
    <img src="https://img.shields.io/github/v/release/neo-florescence/neo-expensive?display_name=release&include_prereleases&sort=date&style=for-the-badge" />
  </a>
</div>

<br />

<img src=".github/assets/social_preview.jpg" alt="repository social preview" />

<h3 align="center">
  <a href="https://www.figma.com/file/FPDU6Ekw6eKzZlmiB6OhrB/Layout?node-id=315%3A77">Figma</a> &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#">Notion</a>
</h3>

> Neo Expensive is a gaming e-commerce

<img src=".github/assets/rainbow_separator.svg" />

## Table of contents

- [Introduction](#introduction)
  - [What are we?](#what-are-we)
  - [Core Values](#core-values)
- [Development Environment](#development-environment)
  - [Tools](#tools)
    - [git](#git)
    - [github-cli (optional)](#github-cli)
    - [node](#node)
    - [yarn](#yarn)
    - [IDE/Code Editor](#ide)
- Git Workflow
  - branches
  - commits
  - releases
  - QA
  - contributing
    - Getting Started
- Architecture
  - monorepo
  - tests
  - microservices
  - microfrontends
- Roadmap
- License
- Support
- You may also like
- Contributors

<img src=".github/assets/rainbow_separator.svg" />

<br />

<!--
  =====================================
  INTRODUCTION
  =====================================
-->
<section>
  <h1 id="introduction">
    <strong>
      📖 Introduction
    </strong>
  </h1>

  <div>
    <h2 id="what-are-we">
      What are we?
    </h2>
    <p>
      Neo Expensive is an e-commerce for gamers, bringing exclusive and personalized content that only exists here
    </p>
  </div>

  <br />
  <div>
    <h2 id="core-values">
      Core values
    </h2>
    <p>
      We aim to build a product that looks and feels good to use but projected for the gaming niche and having customization be it's biggest feature.
    </p>
  </div>
</section>

<img src=".github/assets/rainbow_separator.svg" />
<br />
<br />

<!--
  =====================================
  DEVELOPMENT ENVIRONMENT
  =====================================
-->
<section>
  <h1 id="development-environment">
    <strong>
      Development Environment
    </strong>
  </h1>

  <p>Before diving into how to develop for Neo Expensive, we'll need some gear first, let's get that ready.</p>

  <br />

  <div>
    <h2 id="tools">
      Tools
    </h2>
    <strong>Here is a set of cherry-picked tools and why each is needed</strong>
    <ul>
      <li id="git">
        <h3>
          <a href="https://git-scm.com/"><strong>Git</strong></a>
        </h3>
        <p>you probably know this by now but git is pretty much essential when it comes to building software, you'll need it if you want to make any bigger contributions</p>
      </li>
      <li id="github-cli">
        <h3>
          <a href="https://cli.github.com/"><strong>Github CLI* (Optional)</strong></a>
        </h3>
        <p>github cli comes in handy when you need to create and merge multiple branches, in this project it plays a big role</p>
      </li>
      <li id="node">
        <h3>
          <a href="https://nodejs.org/en/"><strong>Node</strong></a>
        </h3>
        <p>Node.js is the biggest technology of all in the repo, because it allows us to run javascript outside of the browser, every library/package/app is build with node.js, you're contributing to any of those, you must install node.js</p>
        <p>as of the version, anything above 12.22.0 will work</p>
        <p>here is worth mentioning <a href="https://github.com/nvm-sh/nvm">NVM</a>, which makes it easy to have multiple node version in the same OS</p>
      </li>
      <li id="yarn">
        <h3>
          <a href="https://yarnpkg.com/"><strong>Yarn</strong></a>
        </h3>
        <p>As known for many of you, <a href="https://yarnpkg.com/">yarn</a> than <a href="https://www.npmjs.com/">npm</a>, which is the default node package manager, but we're not just using it for speed, yarn also has many other features that help make development faster and more enjoyable, like:
          <ul>
            <li>Global caching of depencencies</li>
            <li>Workspaces</li>
            <li>Offline cache</li>
          </ul>
        </p>
        <p>Both of these features play a HUGE role in how our software is written and also how it's shipped to the end user</p>
      </li>
      <li id="ide">
        <h3>
          <a href="https://yarnpkg.com/"><strong>IDE/Code Editor* (Optional)</strong></a>
        </h3>
        <p>
          as far as it goes you could use any code editor or IDE to contribute but if you're looking for some guidance we will recommend you some editors, why you would choose them and what plugins you should have installed to have the best experience while developing
          <ul>
            <li>
              <a href="https://code.visualstudio.com/">
                <strong>Visual Studio Code</strong>
              </a>
              <p>
                Visual Studio Code (not be mistaken by it's older purple brother, Visual Studio) is easily the most well known and "best" code editor available, our whole team at Neo-Florescence uses it, but we recommend you to use some plugins to enhance your coding experience.
              </p>
            </li>
            <li>
              <a href="https://www.lunarvim.org/#opinionated"><strong>LunarVim</strong></a>
              <p>
                LunarVim is an IDE built on top of the good ol' classic Neovim, looking very similar to Visual Studio Code but being as exensible as Neovim gets
              </p>
            </li>
            <li>
              <a href="https://www.gnu.org/software/emacs/"><strong>Emacs</strong></a>
              <p>
                Emacs is a text editor that is kind of similar to vim, being very customizable and fast
              </p>
            </li>
          </ul>
          <p>
            Here's a list of plugins you might find useful to have in your Code Editor/IDE
            <ul>
              <li>EditorConfig</li>
              <li>Eslint</li>
              <li>Prettier</li>
            </ul>
          </p>
        </p>
      </li>
    </ul>
  </div>
</section>

## Tecnologies

<br />

<a href="https://yarnpkg.com">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=ffffff" />
</a>

<a href="https://yarnpkg.com">
  <img src="https://img.shields.io/badge/EditorConfig-000?style=for-the-badge&logo=editorconfig&logoColor=ffffff" />
</a>

<a href="https://www.w3.org/html">
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
</a>

<a href="https://sass-lang.com">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
</a>

<a href="https://postcss.org/">
  <img src="https://img.shields.io/badge/Postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white" />
</a>

<a href="https://reactjs.org/">
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react" />
</a>

<a href="https://nextjs.org/">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js" />
</a>

<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</a>

<a href="https://github.com/features/actions">
  <img src="https://img.shields.io/badge/Github Actions-000000?style=for-the-badge&logo=github-actions" />
</a>

<a href="https://eslint.org/">
  <img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=eslint" />
</a>

<a href="https://eslint.org/">
  <img src="https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint" />
</a>

<a href="https://prettier.io/">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=000" />
</a>

<a href="https://prettier.io/">
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=FFF" />
</a>

<br />
<br />
<br />

# What Are We?

Neo Expensive is about the building of a brazilian e-commerce project for school. <br>
We as team aim to make a product that looks good and feel good to use, having what and everything a e-commerce needs to be successful!
That includes a register and login system, aswell as a functioning grocery cart, support and institutional page with much more to yet show...

<br />

# Insight Info

<h2>
  <a href="https://esquemaflorescer.github.io/neo-expensive/packages/web/">Neo Expensive Official Page</a>
</h2>

<h3>
  <a href="https://lucid.app/lucidchart/invitations/accept/inv_ebc6cbe7-7c47-4d54-b51c-5c2f5d29ea1f">SiteMap</a>
</h3>
<sup>You'll have to login to see this one.</sup>

<h3>
   <a href="https://www.figma.com/file/QyGjS7EPhR3LkcinvEafvM/Wireframe?node-id=0%3A1">Wireframe</a>
</h3>
<h3>
   <a href="https://www.figma.com/file/FPDU6Ekw6eKzZlmiB6OhrB/Layout?node-id=0%3A1">Layout</a>
</h3>

### Database Structure

![Neo](https://user-images.githubusercontent.com/61664367/131562240-27b253fd-9391-44bd-a51e-ad3b959601ac.png)

### Folder Structure

| Codebase | Description |

| :----------------------------- | :--------------------: |
| [next](packages/next) | Main Web App |
| [web](packages/web) | HTML Prototype Web App |
| [server](packages/server) | The Node.js API |
| [workflows](.github/workflows) | Workflows |

<br />

# ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />

# Code Reviewers

Contributors helping to review/merge pull requests:

- [@VitorGouveia](https://github.com/vitorgouveia)
- [@Thiago](https://github.com/atomicfeast)
