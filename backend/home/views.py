from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import filters, viewsets

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, generics, mixins
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from home.models import Order
from home.renderers import UserRenderer
from home.serializers import *


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}},
                            status=status.HTTP_404_NOT_FOUND)


class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category__product_category']
    search_fields = ['title']

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request)
        else:
            return self.list(request)



class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request, format=None):
        stu = User.objects.get(email = request.user)
        serializer = UserProfileSerializer(stu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': "Complete Data Updated"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class DummyView(APIView):
#     def post(self, request, format=None):
#         serializer = DummySerializer(data=request.data)
#         print(serializer , 'serializer')
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'msg': "Data Created"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
class ProductDetailView(CreateAPIView):
    renderer_classes = [UserRenderer]
    # permission_classes = [IsAuthenticated]
    queryset = ProductDetail.objects.all()
    # print(queryset, "query set")
    serializer_class = ProductDetailSerializer

class MyCart(ViewSet):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        query = Cart.objects.filter(customer=request.user)
        serializers = CartSerializer(query, many=True)
        print('...................................................................')
        all_data = []
        for cart in serializers.data:
            print('cart in serializer.data')
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            print(cart_product , 'cart product')
            cart_product_serializer = CartProductSerializer(cart_product, many=True)
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)

class AddToCartView(ListCreateAPIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]


    def post(self, request, format=None):
        product_id = request.data['id']
        product_title = request.data['title']
        print(product_id , 'id')
        print(product_title , 'title')
        product_obj = Product.objects.get(id=product_id)
        print(product_obj, "product_obj")
        user = request.user
        print(user , 'user')
        product_objec = ProductDetail.objects.filter(username=request.user, product=product_title).last()
        print(product_objec, 'product_objec')
        cart_cart = Cart.objects.filter(customer=request.user).filter(complit=False)
        print(cart_cart, 'carrt_caert')
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        print(cart_product_obj , 'cart product obj')
        try:
            if cart_cart:
                print(cart_cart)
                print("OLD CART")
                this_product_in_cart = cart_cart.filter(detail=product_objec)
                print(this_product_in_cart , 'this_product_in_cart')
                if this_product_in_cart.exists():
                    print("OLD CART PRODUCT--OLD CART")
                    cart_product_new = CartProduct.objects.create(
                        cart=cart_cart,
                        price=product_objec.price,
                        quantity=1,
                        subtotal=product_objec.price
                    )
                    cart_product_new.product.add(product_obj)
                    print(cart_cart.total)
                    print(cart_cart.total.add(product_objec.price))
                    print(product_objec.price)
                    print(cart_cart.total + 1)
                    # cart_cart.total.add(product_objec.price)
                    cart_cart.total.add(product_objec.price)
                    # cart_cart.total += product_objec.price
                    cart_cart.save()
                else:
                    print("NEW CART PRODUCT CREATED--OLD CART")
                    try:
                        new_cart = Cart.objects.filter(customer=request.user).filter(complit=False).first()
                        print(new_cart, 'cart_new')
                        print(product_objec.price , 'price')
                        print(product_obj , 'price product')
                        cart_product_new = CartProduct.objects.create(
                            cart=new_cart,
                            price=product_objec.price,
                            quantity=1,
                            subtotal=product_objec.price
                        )
                        cart_product_new.product.add(product_obj)
                        print(new_cart.total , 'cart total')
                        print(new_cart.total + product_objec.price)
                        new_cart.total += product_objec.price
                        new_cart.save()
                        print('after try')

                    except:
                        print('something is wrong')
            else:
                print(cart_cart)
                print("NEW CART CREATED")
                Cart.objects.create(customer=request.user, total=0, complit=False, detail=product_objec)
                new_cart = Cart.objects.filter(customer=request.user).filter(complit=False).first()
                cart_product_new = CartProduct.objects.create(
                    cart=new_cart,
                    price=product_objec.price,
                    quantity=1,
                    subtotal=product_objec.price
                )
                cart_product_new.product.add(product_obj)
                print("NEW CART PRODUCT CREATED")
                print(new_cart.total, 'total')
                print(product_objec.price, 'price')
                new_val = product_objec.price
                print(new_val)
                new_cart.total += new_val
                print(new_cart.total, 'total end')
                new_cart.save()

            response_mesage = {'error': False, 'message': "Product add to card successfully",}

        except:
             response_mesage = {'error': True, 'message': "Product Not add!Somthing is Wromg"}

        return Response(response_mesage)


class UpdateCartProduct(APIView):
    renderer_classes =  [UserRenderer]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        product_id = request.data['id']
        print(product_id , 'id ///////////////////////')
        product_obj = Product.objects.get(id=product_id)
        print(product_obj, 'product obj')
        cp_obj = CartProduct.objects.get(product=product_obj)
        print(cp_obj, 'cb_opj')

        cart_obj = cp_obj.cart

        cp_obj.quantity += 1
        cp_obj.subtotal += cp_obj.price
        cp_obj.save()

        cart_obj.total += cp_obj.price
        cart_obj.save()
        return Response({"message": "CartProduct Add Update", "product": request.data['id']})


class EditCartProduct(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        product_id = request.data['id']
        print(product_id , 'id ///////////////////////')
        product_obj = Product.objects.get(id=product_id)
        print(product_obj, 'product obj')
        cp_obj = CartProduct.objects.get(product=product_obj)
        print(cp_obj, 'cb_opj')

        cart_obj = cp_obj.cart

        cp_obj.quantity -= 1
        cp_obj.subtotal -= cp_obj.price
        cp_obj.save()

        cart_obj.total -= cp_obj.price
        cart_obj.save()
        if (cp_obj.quantity == 0):
            cp_obj.delete()
        return Response({"message": "CartProduct Add Update", "product": request.data['id']})


class Delatecartproduct(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        product_id = request.data['id']
        print(product_id, ' delete id ')
        product_obj = Product.objects.get(id=product_id)
        print(product_obj, 'product obj')
        cart_obj = Cart.objects.get()
        cp_obj = CartProduct.objects.get(product=product_obj)
        print(cp_obj, 'cb_opj')

        cart_obj = cp_obj.cart

        # cp_obj.quantity -= 1
        print(cp_obj.subtotal)
        # cp_obj.subtotal -= cp_obj.subtotal
        print(cp_obj.subtotal)
        cp_obj.save()
        print(cart_obj.total)
        cart_obj.total -= cp_obj.subtotal
        print(cart_obj)
        cp_obj.delete()
        return Response({"message": "CartProduct Delated", "product": request.data['id']})


class OrderViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        query = Order.objects.filter(cart__customer=request.user)
        serializers = OrderSerializer(query, many=True)
        all_data = []
        for order in serializers.data:
            print(order['cart'],'order')
            cartproduct = CartProduct.objects.filter(cart_id=order['cart'])
            cartproduct_serializer = CartProductSerializer(cartproduct, many=True)
            order['cartproduct'] = cartproduct_serializer.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self, request, pk=None):
        try:
            print('try ')
            print(pk,'pk')
            order_obj = Order.objects.get(id=pk)
            print(order_obj,'query set')
            serializers = OrderSerializer(order_obj)
            print(serializers,'serializers set')

            data = serializers.data
            print(data,'data')

            all_date = []
            cartproduct = CartProduct.objects.filter(cart_id=data['cart'])
            cartproduct_serializer = CartProductSerializer(cartproduct, many=True)
            data['cartproduct'] = cartproduct_serializer.data
            all_date.append(data)
            response_message = {"error": False, "data": all_date}
        except:
            response_message = {"error": True, "data": "No data Found for This id"}

        return Response(response_message)

    def destroy(self, request, pk=None):
        try:
            order_obj = Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            responsemessage = {"erroe": False, "message": "Order delated", "order id": pk}
        except:
            responsemessage = {"erroe": True, "message": "Order Not Found"}
        return Response(responsemessage)

    def create(self, request):
        cart_id = request.data["cartid"]
        # cart_prod = CartProduct.objects.filter(cart=cart_id)[0]
        print(cart_id, 'iddddddddd')
        cart_obj = Cart.objects.get(id=cart_id)
        address = request.data["address"]
        mobile = request.data["mobile"]
        cart_obj.complit = True
        cart_obj.save()
        created_order = Order.objects.create(
            cart=cart_obj,
            address=address,
            mobile=mobile,
            total=cart_obj.total,
            # quantity=cart_prod.quantity
            # order_status="Order Received"
        )

        return Response({"message": "order Resebed", "cart id": cart_id, "order id": created_order.id})

