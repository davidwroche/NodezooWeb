build :
	mkdir -p app
	cp -r ../../web.js ../../node_modules ../../srv ../../www app
	git clone https://github.com/rjrodger/seneca-browser
	mv seneca-browser ../../node_modules
	docker build -t nodezoo-web:1 .
	docker build -t nodezoo-web-prod:1 -f Dockerfile-prod .

clean :
	rm *~

.PHONY : build clean
