## use data base

```mysql

USE sql_store;
SELECT * FROM customers;

```



## Comments ordering as per the first name

```mysql

SELECT * 
FROM customers
-- where customer_id=1; this is sql comment
ORDER by first_name;
```

## Arithmetic operations on columns and display them in a new column

```mysql
SELECT   first_name, last_name, points, points*10 + 100 AS generator
FROM customers;

SELECT   
	first_name, 
    last_name, 
    points, 
    (points + 10) * 100 AS 'discount factor' -- beter to use prenthasis
FROM customers;

```

## Exercise

```mysql
SELECT 
	name,
    unit_price,
    unit_price * 1.1 as "new price"
FROM products;
```

## where

```mysql
USE sql_store;
SELECT * FROM customers WHERE points > 3000;
-- same
SELECT * FROM customers WHERE state = "VA";
SELECT * FROM customers WHERE state = "va";

-- not equal
SELECT * FROM customers WHERE state != "VA";
SELECT * FROM customers WHERE state <> "VA";

-- dates
SELECT * FROM customers WHERE birth_date > '1990-01-01'
```

## exercise

```mysql
SELECT * FROM orders WHERE order_date >= '2019-01-01';
		
```

## AND OR NOT

```mysql
SELECT * FROM customers WHERE birth_date >= '1990-01-01' AND points > 1000;

SELECT * FROM customers WHERE birth_date > '1990-01-01' OR points > 1000 AND state="VA";
SELECT * FROM customers WHERE birth_date > '1990-01-01' OR (points > 1000 AND state="VA");
-- AND is Higher than OR

-- gives u a different 
SELECT * FROM customers WHERE (birth_date > '1990-01-01' OR points > 1000) AND state="VA";


SELECT * FROM customers WHERE NOT (birth_date > '1990-01-01' OR points > 1000);
SELECT * FROM customers WHERE birth_date <= '1990-01-01' OR points < 1000);

USE sql_store;
select * from order_items where product_id=6 and (unit_price * quantity) > 30;
```

## Like

```mysql
SELECT *
FROM customers
WHERE first_name LIKE ‘b%’


```

