function Privacy() {
    function handleClose() {
        window.close();
    }

    return (
        <div className="special-page">
            <div className="headline">
                <h1>Datenschutz-<br />
                    erklärung</h1>
                <div onClick={handleClose}>
                    <img src="/assets/icons/back_arrow.png" alt="" />
                </div>
            </div>
            <br />
            <p>Wir freuen uns über Ihr Interesse an unseren Dienstleistungen. Der Schutz Ihrer personenbezogenen
                Daten ist für uns ein wichtiges Anliegen. Nachfolgend möchten wir Sie daher über die Verarbeitung
                Ihrer Daten bei der Nutzung unserer Website informieren. </p>
                <br />
            <h2>Verantwortlicher</h2>
            <br />
            <p>Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der
                Datenschutz-Grundverordnung (DSGVO) ist:</p>
            <li>Tobias Roeske</li>
            <li>Email der Verantwortlichen: <b>info@tobias-roeske.com</b></li>
            <li>Adresse der Verantwortlichen: <b>Straßbergerstraße 99, 80809 München</b></li>
            <br />
            <h2>Erfassung und Verarbeitung von personenbezogenen Daten</h2>
            <br />
            <p>Beim Besuch der Website
                Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser
                automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden
                temporär in einem sogenannten Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr
                Zutun erfasst und bis zur automatisierten Löschung gespeichert:
                IP-Adresse des anfragenden Rechners,
                Name und URL der abgerufenen Datei,
                Website, von der aus der Zugriff erfolgt (Referrer-URL),
                Die Verarbeitung dieser Daten erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres
                berechtigten Interesses an der Gewährleistung der Sicherheit und Stabilität unserer Website.
                Bei Nutzung unseres Kontaktformulars
                Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt gemäß Art. 6 Abs. 1 lit. a
                DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung.
                Die für die Benutzung des Kontaktformulars von uns erhobenen personenbezogenen Daten werden nach
                Erledigung der von Ihnen gestellten Anfrage automatisch gelöscht.
            </p>
            <br />
            <h2>Weitergabe von Daten</h2>
            <br />
            <p>
                Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten
                Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
                Sie Ihre nach Art. 6 Abs. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,
                die Weitergabe nach Art. 6 Abs. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von
                Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes
                schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,
                für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 lit. c DSGVO eine gesetzliche Verpflichtung
                besteht, sowie
                dies gesetzlich zulässig und nach Art. 6 Abs. 1 lit. b DSGVO für die Abwicklung von
                Vertragsverhältnissen mit Ihnen erforderlich ist.</p>
                <br />
            <h2>Ihre Rechte</h2>
            <br />
            <p>
                Sie haben das Recht:
                gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.
                Insbesondere können Sie Auskunft über die Verarbeitungszwecke und ggf. aussagekräftigen
                Informationen zu deren Einzelheiten verlangen;
                gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns
                gespeicherten personenbezogenen Daten zu verlangen;
                gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen,
                soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information,
                zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;
                gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen,
                soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie
                aber deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art. 21
                DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;
                gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem
                strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen
                anderen Verantwortlichen zu verlangen;
                gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen.
            </p> <br></br>
        </div>
    );
}

export default Privacy;