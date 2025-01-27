FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py ./

RUN mkdir -p dataset
COPY dataset/iris.csv dataset/

RUN chmod -R 755 /app

EXPOSE 5005

CMD ["python", "app.py"]
