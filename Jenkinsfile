pipeline {
  agent any
  stages {
    stage('Prepare enviroment') {
      steps {
        sh  '''
            echo "preparamos enviroment"
            npm install
            '''
      }
    }
    stage('Testing') {
        when {
            not {
                branch 'produccion'
            }
        }
        steps {
            sh  '''
                echo "Hacemos testing"
                npm run test
                '''
        }
    }
    stage('Compile') {
        when {
            anyOf {
                branch 'desarrollo';
                branch 'produccion'
            }
        }
        steps {
            sh  '''
                echo "Hacemos el package"
                npm run build
                '''
        }
    }
    stage('Build docker image') {
            when{
                branch 'produccion'
            }
            steps {
                sh  '''
                    echo "Contruimos la imagen docker"
                    cp -r ./dist/spa ./spa
                    docker build -t imagen-menjador .
                    '''
                cleanWs()
            }
    }

    stage('Upload image to registry'){
        when{
            branch 'produccion'
        }
        steps  {
            sh  '''
                echo "Subimos la imagen docker creada"
                docker tag  imagen-menjador  registry-back.esliceu.com/imagen-menjador
                docker push  registry-back.esliceu.com/imagen-menjador
                '''
            cleanWs()
        }
    }

    stage('Deploying on produccion'){
        when{
            branch 'produccion'
        }
        steps  {
        sh  '''
            echo "desplegamos"
            ssh deploy.esliceu.com "cd core_i_menjador; docker-compose stop; docker-compose pull; docker-compose up -d"
            '''
        cleanWs()
        }
    }
  }
}
