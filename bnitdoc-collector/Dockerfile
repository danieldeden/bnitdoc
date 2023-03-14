FROM python:3.8
RUN apt-get install git
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN echo "    IdentityFile ~/.ssh/id_rsa" >> /etc/ssh/ssh_config
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh

COPY cmd.py .
COPY git.py .
COPY main.py .
COPY init.sh .

CMD [ "/bin/bash", "init.sh" ]
