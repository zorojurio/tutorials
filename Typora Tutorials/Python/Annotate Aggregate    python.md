# Annotate

Annotation is used to add a separate Colum for specific query set defined by a user. lets assume that we want to get the count of order items in a order in to a specific Colum in a query. in other words we are adding a calculated Colum in the query set, which is not available in the database,  Which will be important in later stages. Here we will be using annotate in multiple scenarios. It will be explained well using the following database.

```python
from django.db import models

class OrderItem(models.Model):
    order = models.ForeignKey("Order", on_delete=models.CASCADE)
    item = models.ForeignKey(Variation, on_delete=models.CASCADE)
    cart_item = models.OneToOneField(CartItem, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    shipping_cost = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)


class Order(models.Model):
    order_id = models.CharField(max_length=120, blank=True)  # AB31DE3
    billing_profile = models.ForeignKey( BillingProfile, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(
        Address, null=True, blank=True, on_delete=models.SET_NULL, related_name="shipping_address")
    billing_address = models.ForeignKey(
        Address, null=True, blank=True, on_delete=models.SET_NULL, related_name="billing_address")
    shipping_address_final = models.TextField(blank=True, null=True)
    billing_address_final = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=120,
        default='created',
        choices=ORDER_STATUS_CHOICES
    )
    post_order_status = models.CharField(
        max_length=120,
        choices=PAYMENT_STATUS_CHOICES
    )
    active = models.BooleanField(default=True)
```

- ## getting the order_item count in all orders

  ```python
  from orders.models import Order
  from django.db.models import Count, Avg, Sum
  
  qs = Order.objects.annotate(order_item_count=Count('orderitem'))
  for i in qs:
      print(i.order_item_count)
  ```

  this code will print the order item count in each order.

  <u>Output</u>

  ![image-20201010105457733](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201010105457733.png)

  - ## Getting the total value of all orders using  aggregate and annotate

  ```python
  from orders.models import Order
  from django.db.models import Count, Avg, Sum
  from django.db.models import
  
  order_items = Order.objects.annotate(
  order_totals=Sum(
      (F('orderitem__price')*F('orderitem__quantity')+F('orderitem__shipping_cost')), 				output_field=FloatField())
).aggregate(
      Sum('order_totals')
  )
  ```
  
  

```

```

