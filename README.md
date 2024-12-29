# Portal front-end
[![Build Status](https://server.stijnhooft.be/jenkins/buildStatus/icon?job=portal-front-end/master)](https://server.stijnhooft.be/jenkins/job/portal-front-end/job/master/)

This the front-end of the portal.

## How modular is this front-end?

### The first attempt: a true modular front-end
While the back-end functionality can be kept apart in separate components (if some supporting components are put in place), this is much harder in the front-end.
At first, I've tried to create a "real modular" front-end. 

* Every back-end module has its own front-end module (when needed).
* The front-end and back-end module are kept in the same Git repository, living nicely together.
* A front-end core component loads all these separate modules in one page.

Still, the user will access the app in one place only. This means I have to assemble all components in one app, the so called "core app".
This core app 
* is the access point
* contains a menu to go from one app to the other
* and displays the chosen module.

These are the options that I thought of, to realize this:

* **Option 1: use web components to load everything in the same domain.**
    * The Angular/React/Polymer/... needs to be loaded for every component, again and again
    * Static resources, like images, css, ... cannot be referenced relatively.
    * The manifest file still needs to be shared in a front-end-core component, which means it's still no completely autonomous commponent.
* **Option 2: use i-frames to keep everything in separate contexts**
    * The Angular/React/Polymer/... needs to be loaded for every component, again and again
    * I'll run into the safety limitations of cross-domain-origins pretty fast. For example: I cannot transfer a JWT token from one domain to another, unless I start using a proxy. In that case, I run into the same issues I have without option 1.
    * Frames look horrible on mobile. It will also be noticeable that the parent frame loads first, the i-frame next.

Neither options cut it. I want a highly-functioning **progressive web app**. 

### Current attempt: a single front-end, that consists of modules/web components with shared static resources
Ok, my conclusion is that a high-performing front-end cannot be split into completely separate modules, due to the design of the web.

The best second thing is to have **a single front-end**, but keep the different domains separated via **modules** or **web components**.

The unsplittable common part is kept in a single location. Efforts are made to keep these as small and clear as possible.

## The front-end's architecture
* The **core framework is written in Angular**.
    * At the moment of writing, this framework offers the best options regarding building a progressive web app.
    * Angular is also perfectly capable to load web components, which frees up my choice in front-end technologies.
* I can choose to write each module
    * in **Angular**
    * in **another technology**, as long as I can pack it in a **web component**
* All static resources, like the manifest, css, images, ... are kept in one place.

## Environment variables
| Name | Example value | Description | Required? |
| ---- | ------------- | ----------- | -------- |
| POSTGRES_PASSWORD | secret | Password to log in to the database | required
| JAVA_OPTS_FRONT_END | -Xmx400m -Xms400m | Java opts you want to pass to the JVM | optional



## There is Java code in this module?
Although it's called the front-end, this module has both a Java (back-end) part and an Angular (front-end) part.

### The Java part
Although the name of this module would imply that this is a plain front-end module, still a little bit of back-end heavy lifting was necessary.

This back-end part is responsible to **manage user-specific front-end settings**, like: *"To which modules should the user have access?"*

### The Angular part

You can find the code under ``src/main/web``.

## How to build this project?
* Local environment: ``npm run dev``
* Production environment: ``npm run build``


## A swift development workflow
During development of the front-end, I like to start the Java application to serve as a back-end, ignoring the front-end at port 2001.

Then, I use ``npm start`` to start up another front-end on 4200. This front-end makes use of the backend at port 2001, so no mocking required. Still, I can adapt the code and watch the front-end reload live, allowing me to develop swiftly.

If I need to test the **Progressive Web App functionality**, like offline working, I need to run the front-end with ``npm run staging`` instead.


## The security system
### Naming conventions of modules and routes
Make sure that the route to your component is the same as the component name in lowercase.

For example: if I have a module with the name "Notifications", the route name to go to that module should be set up as "notifications".


## Using Angular CLI
In order to scaffold code, this project makes use of [Angular CLI](https://github.com/angular/angular-cli).

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Release
#### How to release
To release a module, this project makes use of the JGitflow plugin and the Dockerfile-maven-plugin.

1. Make sure all changes have been committed and pushed to Github.
1. Switch to the dev branch.
1. Make sure that the dev branch has at least all commits that were made to the master branch
1. Make sure that your Maven has been set up correctly (see below)
1. Run `mvn jgitflow:release-start -Pproduction`.
1. Run `mvn jgitflow:release-finish -Pproduction`.
1. In Github, mark the release as latest release.
1. Congratulations, you have released both a Maven and a Docker build!

More information about the JGitflow plugin can be found [here](https://gist.github.com/lemiorhan/97b4f827c08aed58a9d8).

##### Maven configuration
At the moment, releases are made on a local machine. No Jenkins job has been made (yet).
Therefore, make sure you have the following config in your Maven `settings.xml`;

````$xml
<servers>
		<server>
			<id>docker.io</id>
			<username>your_username</username>
			<password>*************</password>
		</server>
		<server>
			<id>portal-nexus-releases</id>
			<username>your_username</username>
            <password>*************</password>
		</server>
	</servers>
````
* docker.io points to the Docker Hub.
* portal-nexus-releases points to my personal Nexus (see `<distributionManagement>` in the project's `pom.xml`)

#### NPM release?
No release is made on NPM, since this is not a reusable resource for other projects.
