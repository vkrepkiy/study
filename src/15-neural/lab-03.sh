docker build -t lab-03 lab-03 &&\
docker run --gpus all --runtime=nvidia -it --rm --mount type=bind,src=$(pwd)/lab-03,dst=/tf/lab-03 -w /tf/lab-03 lab-03:latest python vgg16.py
