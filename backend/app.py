from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
import mlflow
import mlflow.sklearn
from mlflow.models import infer_signature

# Flask app
app = Flask(__name__)
CORS(app)

# Global variables
model = None

# Load dataset and prepare training/testing data
iris = pd.read_csv("./dataset/iris.csv")
X = iris.drop(["target"], axis=1)
y = iris["target"]
feature_names = iris.columns[:-1]
target_names = ["setosa", "versicolor", "virginica"]
train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.2, random_state=42)

#function to evaluate metrics
def eval_metrics(actual, pred):
    accuracy = accuracy_score(actual, pred)
    precision = precision_score(actual, pred, average="weighted")
    recall = recall_score(actual, pred, average="weighted")
    f1 = f1_score(actual, pred, average="weighted")
    return accuracy, precision, recall, f1

@app.route('/train', methods=['POST'])
def train_model():
    # Random Forest Classifier and log metrics with MLflow
    global model

    # Get hyperparameters from the request
    params = request.json
    n_estimators = params.get('n_estimators', 100)
    max_depth = params.get('max_depth', None)

    # Train the model
    model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=42)
    model.fit(train_x, train_y)
    predictions = model.predict(test_x)

    # metrics
    accuracy, precision, recall, f1 = eval_metrics(test_y, predictions)

    # Log metrics and model with MLflow
    with mlflow.start_run():
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("max_depth", max_depth)
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("precision", precision)
        mlflow.log_metric("recall", recall)
        mlflow.log_metric("f1_score", f1)

        predictions_train = model.predict(train_x)
        signature = infer_signature(train_x, predictions_train)
        input_example = train_x[:5]
        mlflow.sklearn.log_model(model, "model", signature=signature, input_example=input_example)

    return jsonify({
        "message": "Model trained and logged to MLflow",
        "metrics": {
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1_score": f1
        }
    })

@app.route('/predict', methods=['POST'])
def predict():
    # predictions using the trained model with a JSON array of input data.

    global model
    if model is None:
        return jsonify({"error": "Model not trained. Train the model first using /train."}), 400

    #input data from the request
    input_data = request.json.get("input", [])
    if not input_data:
        return jsonify({"error": "No input data provided"}), 400

    # Check that it is a list of list of numbers
    if not all(isinstance(i, list) and all(isinstance(j, (int, float)) for j in i) for i in input_data):
        return jsonify({"error": "Invalid input format. It should be a list of list of numbers"}), 400

    #convert input data to numpy array
    input_array = np.array(input_data)

    # predictions
    predictions = model.predict(input_array).tolist()

    return jsonify({
        "predictions": predictions,
        "target_names": [target_names[p] for p in predictions]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
