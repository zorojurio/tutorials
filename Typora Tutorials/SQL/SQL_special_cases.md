## REGEXP

name starts with mac and ends with field

```mysql
FROM customers where last_name REGEXP 'field$|^mac';


```

name has ge, ie and me components

```mysql
FROM customers where last_name REGEXP '[gim]e';

brushfield
boagey


SELECT * FROM customers WHERE first_name REGEXP 'elka|ambur';
SELECT * FROM customers WHERE last_name REGEXP 'ey$|on';
SELECT * FROM customers WHERE last_name REGEXP '^y|on';
SELECT * FROM customers WHERE last_name REGEXP 'b[ru]';
```

![image-20201016152702407](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201016152702407.png)

## LIMIT

![image-20201016153340041](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201016153340041.png)

![image-20201016153403628](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201016153403628.png)

```mysql
select o.order_id, o.order_date, c.first_name, c.last_name, o.status from orders o
join customers c
	on o.customer_id = c.customer_id 
    join sql_invoicing.payment_methods p 
on o.status=p.payment_method_id ;
```

## Composite PK

```mysql
SELECT * FROM sql_store.order_items;

select *
from order_items oi
join order_item_notes oin
	on oi.order_id = oin.order_id 
    and oi.product_id = oin.product_id;
```

## implicit join syntax

```mysql
-- normal Join
SELECT * FROM orders o join customers c on c.customer_id = o.customer_id;


select * from orders o, customers c 
where o.customer_id = c.customer_id;


-- cross join (number = table 1 x table 2)
select * from orders o, customers c ; 



```

## outer LEFT  join

```mysql
-- gives u customers who only have ordrs
select c.customer_id, c.first_name, o.order_id 
from customers c 
join orders o 
on c.customer_id = o.customer_id;

-- but we need all customers and respective order number whether they have an order or not
-- all the columns in the customers tablw will be joined with order table based on customers id. if customer doesnt have and order it will give u a null coulum

SELECT c.customer_id, c.first_name, o.order_id 
FROM customers c
LEFT JOIN orders o  -- all the records from the left table
ON c.customer_id = o.customer_id
ORDER BY c.customer_id;


SELECT p.product_id, p.name, oi.quantity
FROM products p
LEFT JOIN order_items oi
ON p.product_id=oi.product_id
ORDER BY p.product_id;


```

OUTER RIGHT JOIN

```mysql
-- combine all the records of the right table
SELECT c.customer_id, c.first_name, o.order_id 
FROM customers c
RIGHT JOIN orders o  -- all the records from the left table
ON c.customer_id = o.customer_id
ORDER BY c.customer_id;		


-- above table is similar to the NORMAL OUTER JOIN. 


```

## Exercise

```mysql
SELECT o.order_date, o.order_id, c.first_name AS customer , s.name AS shipper, os.name AS status
FROM orders o
JOIN customers c
ON o.order_id = c.customer_id
LEFT JOIN shippers s
on o.shipper_id = s.shipper_id 
JOIN order_statuses os
ON o.status = os.order_status_id
ORDER BY os.name, o.order_id;



```

## JOINING THE SAME TABLE

```mysql
SELECT e.employee_id, e.first_name, m.first_name as Manager 
from employees e
left join employees m
on e.reports_to = m.employee_id;
```

## Using

```mysql
use sql_store;

SELECT o.order_id, c.first_name
FROM orders o
JOIN customers c
 -- ON o.customer_id = c.customer_id;
USING (customer_id);


select * from orders o
join customers c
using (customer_id) -- customer_id can be seen in every table
left join shippers
using (shipper_id) ;

-- AND statement using USING
select * from order_items oi
join order_item_notes oin
on oi.order_id = oin.order_id and 
oi.product_id = oin.product_id ;


select * from order_items oi
join order_item_notes oin
using (order_id, product_id);



```

```mysql
SELECT  p.date,  cl.name , p.amount, pm.name
FROM payments p
join clients cl
using (client_id)
join payment_methods pm
on p.payment_method = pm.payment_method_id;

```

## Natural Join

based on the columns which  have columns. not recommned bcz it gives u unexpected resultes

```
use sql_store;

select * from 
orders o
natural join customers c;


```

## Cross joins

when u want to combine use cistom

```mysql
use sql_store;

select c.first_name as customer, p.name from customers c 
cross join products p
order by c.first_name;
```

Implicit Cross Join

```mysql
select sh.name as Shipper , p.name as Product 
from shippers sh , products p 
order by p.name, sh.name;

select sh.name as Shipper , p.name as Product 
from shippers sh 
cross join products p 
order by p.name, sh.name;
```

## Unions c

combine data from 2 queries

```mysql
select order_id, order_date, 'active' as Status
from orders 
where order_date >= '2019-01-01'
UNION
select order_id, order_date, 'archived' as Status
from orders 
where order_date <= '2019-01-01';
```

![image-20201019152220915](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201019152220915.png)



​	

