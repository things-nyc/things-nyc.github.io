all: faq.docx faq.pdf faq.html
	@echo "Converting document..."

%.pdf: %.md
	pandoc $< -o $@

%.html: %.md
	pandoc $< -o $@

%.docx: %.md
	pandoc $< -o $@

