from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser

#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, tc, password=None, password2=None):
      """
      Creates and saves a User with the given email, name, tc and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
          tc=tc,
      )

      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, name, tc, password=None):
      """
      Creates and saves a superuser with the given email, name, tc and password.
      """
      user = self.create_user(
          email,
          password=password,
          name=name,
          tc=tc,
      )
      user.is_admin = True
      user.save(using=self._db)
      return user

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)
  tc = models.BooleanField()
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'tc']

  def __str__(self):
      return self.email

  def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_admin

  def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin


class Category(models.Model):
    product_category= models.CharField(max_length=300,default='')

    def __str__(self):
        return  self.product_category


class Product(models.Model):
    title = models.CharField(max_length=300)
    image = models.ImageField(upload_to='product')
    category = models.ForeignKey(Category , on_delete=models.CASCADE,default='')
    selling_price = models.PositiveIntegerField()
    market_price = models.PositiveIntegerField()
    description = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

class ProductDetail(models.Model):
    extra = models.CharField(max_length=250, default='')
    mattress = models.CharField(max_length=250 ,default='')
    button = models.CharField(max_length=250,default='' )
    fabric = models.CharField(max_length=250, default='')
    bed_size = models.CharField(max_length=250,default='' )
    product = models.CharField(max_length=250, null=False, blank=False)
    username = models.CharField(max_length=250, null=False, blank=False)
    price = models.PositiveIntegerField()


class Cart(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    detail = models.ForeignKey(ProductDetail, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complit = models.BooleanField(default=False)


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()

    def __str__(self):
        return f"Cart=={self.cart.id}<==>CartProduct:{self.id}==Qualtity=={self.quantity}"


ORDER_STATUS = {
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "on the way"),
    ("Order Completed", "Order Complted"),
    ("Order Canceled", "Order Canceled")
}


class Order(models.Model):
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    address = models.CharField(max_length=250)
    mobile = models.CharField(max_length=16)
    total = models.PositiveIntegerField()
    order_status = models.CharField(max_length=22, choices=ORDER_STATUS, default="Order Processing")
    # quantity = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True)
    # payment = models.BooleanField(default=False)



