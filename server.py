from flask import Flask
from flask_socketio import SocketIO, send
import sys
from gevent import monkey

# monkey.patch_all()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socket = SocketIO(app, cors_allowed_origins='*')


@socket.on('message')
def handleMessage(msg):
    print('Message: ' + msg, flush=True)
    app.logger.info('Message: ' + msg)
    send(msg, broadcast=True)


if __name__ == '__main__':
    print("Server is running")
    socket.run(app)
