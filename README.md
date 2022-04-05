# DeepReSPred-front
DeepReSPred Front-end project

Follow the commands below to execute the DeepReSPred front-end project with Docker. It is the easiest and fastest way to make it.

git clone <url_current_repository>
cd DeepReSPred-front
docker image build -t <image-name> .
docker run -dp 8080:80 -it --name <container-name> <image-name>


The file main.js has the urlbackendapi variable, which value could change in order to invoke the deployed back-end services. To modify that value, edit to the main.js file with the following command:
vim /src/main.js