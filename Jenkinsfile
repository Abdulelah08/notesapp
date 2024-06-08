pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "website03:${env.BUILD_ID}"
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Building Docker Image
                    echo "Building Docker image with tag: $DOCKER_IMAGE"
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Replace 'echo "Running tests"' with actual test command
                    echo "Executing tests"
                    sh "docker run --rm $DOCKER_IMAGE npm test"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Running container on designated port
                    echo "Deploying application on port 80"
                    sh "docker run -d -p 80:5050 $DOCKER_image"
                    echo "Deployed successfully"
                }
            }
        }
    }
    post {
        always {
            // Clean up Docker images to free space
            echo "Cleaning up Docker images"
            sh "docker rmi $DOCKER_IMAGE"
        }
    }
}