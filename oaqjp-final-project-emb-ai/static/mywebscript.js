let RunSentimentAnalysis = () => {
    console.log("Iniciando análisis de sentimientos...");
    const textToAnalyze = document.getElementById("textToAnalyze").value;
    console.log(`Texto a analizar: "${textToAnalyze}"`);

    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        console.log(`Estado: ${this.readyState}, Status: ${this.status}`);
        
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log("Respuesta exitosa:", this.responseText);
                try {
                    const response = JSON.parse(this.responseText);
                    document.getElementById("system_response").innerHTML = response.message;
                    
                    // Mostrar datos completos en consola para debug
                    console.group("Datos completos de respuesta");
                    console.log("Status:", response.status);
                    console.log("Message:", response.message);
                    console.log("Data:", response.data);
                    console.groupEnd();
                } catch (e) {
                    console.error("Error parseando JSON:", e);
                    document.getElementById("system_response").innerHTML = this.responseText;
                }
            } else if (this.status === 400) {
                console.log("Error 400:", this.responseText);
                try {
                    const errorResponse = JSON.parse(this.responseText);
                    document.getElementById("system_response").innerHTML = errorResponse.message;
                } catch (e) {
                    document.getElementById("system_response").innerHTML = 
                        "¡Texto inválido! ¡Por favor, inténtalo de nuevo!";
                }
            } else if (this.status === 500) {
                console.error("Error 500:", this.responseText);
                document.getElementById("system_response").innerHTML = 
                    "Error interno del servidor. Por favor intenta más tarde.";
            }
        }
    };

    const url = "/emotionDetector?textToAnalyze=" + encodeURIComponent(textToAnalyze);
    console.log("URL de la petición:", url);
    
    xhttp.open("GET", url, true);
    xhttp.send();
};