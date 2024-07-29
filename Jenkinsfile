pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Use the NodeJS installation named "NodeJS" in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from your repository
                git 'https://github.com/Omar01501/Unit_Test.git',branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                // Run unit tests
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Archive test results
            junit '**/test-results.xml'
        }
        success {
            echo 'All tests passed successfully!'
        }
        failure {
            echo 'Some tests failed. Please check the logs.'
        }
    }
}
