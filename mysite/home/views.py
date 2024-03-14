from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required  # Import the decorator
from django.contrib import messages 
from django.contrib.auth.models import User
import json
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import Dashboard
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse


def home_page(request):
    return render(request, "home/index.html")

def login_page(request):
    context = {}
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home_page')
        else:
            context['error'] = 'Invalid login credentials'
    return render(request, "home/login.html", context=context)


def register_page(request):
    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username=username).exists():
            messages.error(request, 'A user with this username already exists.')
            return render(request, "home/register.html")
        else:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            login(request, user)

            return redirect('home_page')
    else:
        return render(request, "home/register.html")

@login_required(login_url='/login/')
def logout_page(request):
    logout(request)
    return redirect('login_page')


@login_required(login_url='/login/')
def dashboard_page(request):
    return render(request, "home/dashboard_sites.html")

@login_required(login_url='/login/')
def edit_page(request, sitename, page_name=""):
    User = get_user_model()
    if request.method == "POST":
        stored_elements = json.loads(request.POST['storedElements'])
        project_id = 0
        username = User.objects.get(username=request.user.username)

        for item in stored_elements:
            element = item['name']
            element_id = item['idName']
            position = item['position']

            dashboard, created = Dashboard.objects.update_or_create(
                username=username, project_id=project_id, element=element, element_id=element_id,
                defaults={'position': position},
            )

        # Delete dashboards that are not in stored_elements
        Dashboard.objects.filter(
            Q(username=username) & Q(project_id=project_id) & ~Q(element_id__in=[item['idName'] for item in stored_elements])
        ).delete()

    # Load all elements from Dashboard and sort them by position
    elements = Dashboard.objects.filter(username=request.user, project_id=0).order_by('position')
    elements_list = [[element.element, element.element_id] for element in elements]
    elements_json = json.dumps(elements_list, cls=DjangoJSONEncoder)
    return render(request, "home/dashboard.html", {'elements': elements_json})