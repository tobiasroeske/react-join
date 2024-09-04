# Join - Taskmanagement App

Join ist eine Taskmanagement-App, mit der Sie Tasks erstellen und in einem Kanban-Board anzeigen lassen können. Tasks können nachträglich per Drag-and-Drop verschoben werden. Die App ist mit React geschrieben und nutzt React Router, React Contexts und Google Firebase als Backend.

## Features

- Erstellen und Verwalten von Tasks
- Anzeige der Tasks in einem Kanban-Board
- Drag-and-Drop-Unterstützung zum Verschieben von Tasks
- Integration von React Router für die Navigation
- Nutzung von React Contexts für das State Management
- Firebase als Backend für die Datenhaltung

## Installation

1. Klonen Sie das Repository:
    ```bash
    git clone https://github.com/IhrBenutzername/join.git
    ```
2. Navigieren Sie in das Projektverzeichnis:
    ```bash
    cd join
    ```
3. Installieren Sie die Abhängigkeiten:
    ```bash
    npm install
    ```

## Firebase-Konfiguration

1. Erstellen Sie ein neues Projekt auf [Firebase](https://firebase.google.com/).
2. Fügen Sie eine Web-App zu Ihrem Firebase-Projekt hinzu und kopieren Sie die Firebase-Konfigurationsdaten.
3. Erstellen Sie eine Datei `src/firebaseConfig.ts` und fügen Sie Ihre Konfigurationsdaten ein:
    ```typescript
    export const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

4. Fügen Sie `src/firebaseConfig.ts` zur `.gitignore`-Datei hinzu, um zu verhindern, dass sie in das Repository aufgenommen wird:
    ```plaintext
    # Firebase config
    src/firebaseConfig.ts
    ```

## Nutzung

1. Starten Sie die Entwicklungsumgebung:
    ```bash
    npm start
    ```
2. Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser, um die App zu sehen.

## Deployment

Ihre App ist bereit für den Einsatz!

Weitere Informationen zum Deployment finden Sie im Abschnitt über [Deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

**Hinweis: Dies ist eine Einbahnstraße. Sobald Sie `eject` ausführen, können Sie nicht mehr zurück!**

Wenn Sie mit den Build-Tools und Konfigurationsoptionen nicht zufrieden sind, können Sie `eject` jederzeit ausführen. Dieser Befehl entfernt die einzige Build-Abhängigkeit aus Ihrem Projekt.

Stattdessen werden alle Konfigurationsdateien und die transitive Abhängigkeiten (webpack, Babel, ESLint, etc.) direkt in Ihr Projekt kopiert, sodass Sie die volle Kontrolle über diese haben. Alle Befehle außer `eject` funktionieren weiterhin, aber sie verweisen auf die kopierten Skripte, sodass Sie diese anpassen können. Ab diesem Punkt sind Sie auf sich allein gestellt.

Sie müssen `eject` niemals verwenden. Das kuratierte Funktionsset ist für kleine und mittlere Deployments geeignet, und Sie sollten sich nicht verpflichtet fühlen, diese Funktion zu nutzen. Wir verstehen jedoch, dass dieses Tool nicht nützlich wäre, wenn Sie es nicht anpassen könnten, wenn Sie bereit dafür sind.

## Mehr erfahren

Weitere Informationen finden Sie in der [Create React App Dokumentation](https://facebook.github.io/create-react-app/docs/getting-started).

Um mehr über React zu erfahren, besuchen Sie die [React Dokumentation](https://reactjs.org/).

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der [LICENSE](LICENSE) Datei.