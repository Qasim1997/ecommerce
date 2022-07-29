from django.views.generic import TemplateView

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from rest_framework import routers

from Mobile import settings
from home.views import *
route = routers.DefaultRouter()
route.register('orders', OrderViewset, basename="OrderViewset")
route.register('cart', MyCart, basename="MyCart")
urlpatterns = [
    path("", include(route.urls)),
    path('signup/',UserRegistrationView.as_view(),name='registrarion' ),
    path('login/', UserLoginView.as_view(), name='login'),
    path('product/',ProductView.as_view(), name='login'),
    path('product/<int:pk>/',ProductView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('product_detail/',ProductDetailView.as_view(), name='product_detail'),
    path('carts/', AddToCartView.as_view(), name='cart'),
    path("updatecartproduct/", UpdateCartProduct.as_view(), name="updatecartproduct"),
    path("editcartproduct/", EditCartProduct.as_view(), name="editcartproduct"),
    path("delatecartproduct/", Delatecartproduct.as_view(), name='deletecartproduct')

]

