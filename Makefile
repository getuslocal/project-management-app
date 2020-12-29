### DEV

build-dev:
	cd client && $(MAKE) build-dev
	cd api && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

### LOCAL

build-local:
	cd client && $(MAKE) build-local
	cd api && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

### PROD

build-production:
	cd client && $(MAKE) build-production
	cd api && $(MAKE) build	

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

stop:
	docker-compose down

### REMOTE

SSH_STRING:=root@192.81.214.155

ssh:
	ssh $(SSH_STRING)

# apt install make

copy-files:
	scp -r ./* $(SSH_STRING):/root/