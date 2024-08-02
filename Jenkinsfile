pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Omar01501/Unit_Test' , branch: 'main'
            }
        }

        stage('Install Node Modules') {
            steps {
                script {
                    // Install any necessary npm packages
                    sh 'npm install'
                }
            }
        }

        stage('Run Comparison Script') {
            steps {
                script {
                    // Run the comparison.js script
                    def exitCode = sh(script: 'node comparison.js', returnStatus: true)
                    
                    // Check if the script returned a failure exit code
                    if (exitCode != 0) {
                        echo "comparison.js returned false. Stopping the pipeline."
                        error("Pipeline stopped due to comparison failure.")
                    } else {
                        echo "comparison.js returned true. Continuing the pipeline."
                    }
                }
            }
        }

        stage('Subsequent Steps') {
            steps {
                echo 'Running subsequent stages...'
                // Add more stages or steps here as needed
            }
        }
    }
}
