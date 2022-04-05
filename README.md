# DeepReSPred front-end project

This is the front-end component of the Deep Repeat protein Structure Predictor tool, DeepReSPred.

## Installation

Use the following commands to deploy this component with  [docker](https://www.docker.com/). It is the easiest and fastest way to make it. It will use the 8080 environment port by default. Replace the variables in angle brackets [<>]() and execute them.

```bash
git clone <url_current_repository>
cd DeepReSPred-front
docker image build -t <image-name> .
docker run -dp 8080:80 -it --name <container-name> <image-name>
```

## Configuration variable

The file main.js has the [urlbackendapi]() variable, which value could change in order to invoke the deployed back-end DeepReSPred services. To modify that value, edit to the [main.js](https://github.com/SolangePalominoSol123/DeepReSPred-front/blob/main/src/main.js) file with the following command:

```bash
vim /src/main.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## DeepReSPred back-end repository

The DeepReSPred tool needs a back-end component to work out. This component is available in other repository. The docker configuration is still in process. Check the repository 
[DeepReSPred back-end](https://github.com/SolangePalominoSol123/DeepReSPred2-backend)
