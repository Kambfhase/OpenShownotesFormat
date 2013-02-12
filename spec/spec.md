#OpenShownotesFormat

<img src="http://tools.shownot.es/parser/osf_file_icon.png">

Das ```Open Shownotes Format``` oder ```Podlove Shownotes Format``` ist ein offener Standard um Shownotes für Podcasts zu schreiben. Dabei sollen die Shownotes einfach von Menschenhand erstellt werden können, aber dennoch maschinenlesbar sein.

Dieses Dokument enthält eine Grammatik für valide Shownotes, sowie Empfehlungen, wie diese zu Interpretieren sind. 

---

##Rechtliche Hinweise

Dieser offene Standard steht unter der MIT-Lizenz frei zur Verfügung. Jeder ist herzlich eingeladen an der Entwicklung mitzuwirken.

---

##Glossar

- OSF : Open Shownotes Format
- RFC : Request for Comments

##Allgemeine Hinweise

Dieses Dokument ist in deutscher Sprache verfasst. Übersetzungen sind willkommen. Die Begriffe *muss*, *darf*, *sollte* uä. sind analog zu RFC 2119[1] zu verstehen. Sie haben also ihre allgemein übliche Bedeutung. Ein OSF-Dokument, bzw. ein OSF-Parser *muss* sich an die hier beschriebene Grammatik bzw. Verarbeitungsweise halten.

Die hier verwendete Syntax für reguläre Ausdrücke, ist die übliche Perl-Syntax. Ein Umformen dieser, in eine formale Grammatik in EBNF, wird angedacht.

##Spezifikation

Ein OSF-Dokument ist eine Textdatei. Dabei sollte als Kodierung UTF-8 gewählt werden. Das Dokument besteht aus Zeilen, getrennt durch einen Zeilenumbruch. Eine Zeile muss dem folgendem Ausdruck genügen: 

    ^(\d{10}|\d\d:\d\d.\d\d\d|-{1,} )?(.*)(\S#\s+)*$

---

##Referenzen
[1] https://www.ietf.org/rfc/rfc2119.txt