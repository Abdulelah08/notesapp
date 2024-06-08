pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "website03:${env.BUILD_ID}"
    }
    stages {
        stage('Build') {
            steps {
                script {
                    echo "Building Docker image with tag: $DOCKER_IMAGE"
                    bat "docker build -t $DOCKER_IMAGE ."
                }
            }
        }
        stage('Test') {
            steps {
                script {
                   echo "Checking for test script..."
                    sh 'npm list scripts | grep test || echo "No test script found. Skipping tests."'
                    if (scriptReturnCode == 0) {
                        echo "Executing tests"
                        bat "docker run --rm $DOCKER_IMAGE npm test"
                    } else {
                        echo "Tests not found. Skipping..."
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying application on port 5050"

                    // Step 1: Stop the currently running container (if any)
                    bat (
                        script: '''
                        docker stop website03 || echo "No existing container to stop."
                        docker rm website29 || echo "No existing container to remove."
                        ''',
                        returnStatus: true
                    )

                    // Step 2: Start the new container
                    bat "docker run -d -p 5050:5050 --name website03 $DOCKER_IMAGE"

                    echo "Deployed successfully"
            }
        }
    }
    
}
