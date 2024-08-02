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
                    
                    // Check if the script returned a failure exit code
                    if (exitCode != 0) {
                        echo "comparison.js returned false. Stopping the pipeline."
                        error("Pipeline stopped due to comparison failure.")
                    } else {
                        echo "comparison.js returned true. Continuing the pipeline."

                        // Conditional execution for the following stages
                        currentBuild.result = 'SUCCESS'
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

                stage('Building Docker Image') {
                    steps {
                        script {
                            dockerImage = docker.build("${registry}:${BUILD_NUMBER}")
                        }
                    }
                }

                stage('Push Docker Image to Docker Hub') {
                    steps {
                        script {
                            docker.withRegistry('', registryCredential) {
                                dockerImage.push()
                            }
                        }
                    }
                }

                stage('Deploy the App on Current VM') {
                    steps {
                        script {
                            sh """
                            # Stop and remove any existing container with the same name
                            if [ \$(docker ps -a -q -f name=${containerName}) ]; then
                                docker stop ${containerName}
                                docker rm ${containerName}
                            fi

                            # Pull the Docker image from Docker Hub
                            docker pull ${registry}:${BUILD_NUMBER}

                            # Run the Docker container
                            docker run -d --name ${containerName} -p ${port}:${port} ${registry}:${BUILD_NUMBER}
                            """
                        }
                    }
                }

                stage('Cleaning up') {
                    steps {
                        script {
                            sh """
                            # Force remove the Docker image
                            docker rmi -f ${registry}:${BUILD_NUMBER}
                            """
                        }
                    }
                }
            }
        }
    }
                    }
                }
            }
        }

        // Add a conditional block for the Docker-related stages
       

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
