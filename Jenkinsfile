pipeline {
    agent any

    environment {
        IMAGE_NAME = "registry.local:5000/rihlatul-be"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/SMKMADINATULQURAN-PROJECT-2023/BE-Kelompok-Umroh.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push to Local Registry') {
            steps {
                sh 'docker push $IMAGE_NAME:latest'
            }
        }
    }
}

