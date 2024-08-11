pipeline {
    agent any

    environment {
        registry = "omarbh1501/stage_repo"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
        containerName = 'my_app_container'
        port = '8081'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Checking out the repository...'
                    git branch: 'main', url: 'https://github.com/Omar01501/Unit_Test.git'
                }
            }
        }

        stage('Run Comparison Script') {
            steps {
                script {
                    echo 'Running comparison.js script...'
                    def exitCode = sh(script: 'node comparison.js', returnStatus: true)
                   
                    if (exitCode != 0) {
                        echo "comparison.js returned false. Stopping the pipeline."
                        error("Pipeline stopped due to comparison failure.")
                        currentBuild.result = 'False'
                        
                    } else {
                        currentBuild.result = 'SUCCESS'
                        echo "comparison.js returned true. Continuing the pipeline."
                    }
                }
            }
        }

        stage('Docker Operations') {
            when {
                expression {
                    return currentBuild.result == 'SUCCESS'
                }
            }
            stages {
                stage('Cloning Our Git Repository') {
                    steps {
                        script {
                            git url: 'https://github.com/Omar01501/WebSite_Stage', branch: 'main'
                        }
                    }
                }

               stage('Building and Pushing Docker Image with Docker Compose') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: registryCredential, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                        # Log in to Docker Hub
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        
                        # Build and push Docker image using Docker Compose
                        docker-compose -f docker-compose.yml build
                        docker-compose -f docker-compose.yml push
                        """
                    }
                }
            }

                stage('Deploy the App on Current VM using Docker Compose') {
                    steps {
                        script {
                            sh """
                            # Stop and remove any existing container
                            docker-compose -f docker-compose.yml down

                            # Deploy the application
                            docker-compose -f docker-compose.yml up -d
                            """
                        }
                    }
                }

                stage('Cleaning Up') {
                    steps {
                        script {
                            sh """
                            # Remove any dangling images
                            docker image prune -f
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Finished pipeline execution.'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
