

# Adding Domain to the webserver.

[How To Point to DigitalOcean Nameservers From Common Domain Registrars | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)

```
above link will give u information about changing the custom DNS in doamin providers like NameCheap and GoDaddy
```

Changing nameservers of NameCheap

```
Sign in to your Namecheap account, then click Domain List in the left-hand column. You will be presented with a dashboard listing all of your domains. Click the Manage button of the domain you’d like to update.
 In the Nameservers section of the resulting screen, select Custom DNS from the dropdown menu and enter the following nameservers: 
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

##### Digital Ocean Server Change the Following 

![image-20210110123035061](https://i.loli.net/2021/01/10/9RkJdThm34YHQ7c.png)

A >> refers to the domain (eldarn.com)

![image-20210110123215460](https://i.loli.net/2021/01/10/eTEVg5cPHu7RZLm.png)

CNAME >> refers to the www part (www.eldarn.com)

![image-20210110123259709](https://i.loli.net/2021/01/10/HDZpmgiTz7SAWwq.png)





## Creating Multiple Subdomains

you will be able to create a subdomain by creating another A record adding the subdomain part before the domain

![image-20210110123643889](https://i.loli.net/2021/01/10/E2IMGFto1BykObg.png)

