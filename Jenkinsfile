pipeline {
    agent any

    tools {
        nodejs "NodeJS" 
    }

    stages {
        stage('Checkout') {
            steps {
               
                git url: 'https://github.com/Omar01501/Unit_Test.git' ,branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
               
                sh 'npm test'
            }
        }
    }

    post {
        always {
            
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
