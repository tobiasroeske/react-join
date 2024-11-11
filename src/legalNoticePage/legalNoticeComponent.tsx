function LegalNotice() {
  function handleClose() {
    window.close()
  }

  return (
    <div className="special-page">
      <div className="headline">
        <h1>
          Allgemeine <br /> Geschäfts-
          <br />
          bedingungen
        </h1>
        <div onClick={handleClose}>
          <img src="/assets/icons/back_arrow.png" alt="" />
        </div>
      </div>

      <br />
      <h2>Geltungsbereich</h2>
      <br />
      <p>
        Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für
        die Nutzung der kostenlosen Join-Dienste.
      </p>
      <br />
      <h2>Registrierung und Nutzung</h2>
      <br />
      <p>
        Die Nutzung der kostenlosen Join-Dienste setzt eine Registrierung
        voraus. Die Registrierung ist kostenlos und ermöglicht den Zugang zu den
        angebotenen Diensten.
      </p>
      <br />
      <h2>Verfügbarkeit der Dienste</h2>
      <br />
      <p>
        Wir bemühen uns, die kostenlosen Join-Dienste jederzeit verfügbar zu
        halten. Es kann jedoch zu Ausfällen oder Unterbrechungen kommen, für die
        wir keine Haftung übernehmen.
      </p>
      <br />
      <h2>Verantwortung des Nutzers</h2>
      <br />
      <p>
        Der Nutzer ist für die Sicherheit seines Accounts und seiner Daten
        selbst verantwortlich. Der Nutzer verpflichtet sich, die kostenlosen
        Join-Dienste nicht missbräuchlich zu nutzen oder gegen geltendes Recht
        zu verstoßen.
      </p>
      <br />
      <h2>Haftung</h2>
      <br />
      <p>
        Wir haften nur für Schäden, die auf grob fahrlässiges oder vorsätzliches
        Handeln zurückzuführen sind. Eine Haftung für mittelbare Schäden oder
        entgangenen Gewinn ist ausgeschlossen.
      </p>
      <br />
      <h2>Kündigung</h2>
      <br />
      <p>
        Die Nutzung der kostenlosen Join-Dienste ist jederzeit ohne Angabe von
        Gründen kündbar. Wir behalten uns das Recht vor, Accounts zu sperren
        oder zu löschen, wenn gegen diese AGB verstoßen wird.
      </p>
      <br />
      <h2>Änderungen der AGB</h2>
      <br />
      <p>
        Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern. Die
        geänderten Bedingungen werden dem Nutzer per E-Mail mitgeteilt.
      </p>
      <br />
      <h2>Schlussbestimmungen</h2>
      <br />
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne
        Bestimmungen dieser AGB unwirksam sein oder werden, so bleibt die
        Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
      </p>
      <br />
      <p>Letzte Aktualisierung: [17. Februar 2024]</p>
    </div>
  )
}

export default LegalNotice
