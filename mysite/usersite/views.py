from django.shortcuts import render
from django.http import HttpResponse

def site_page(request, username, sitename,page=""):
    return HttpResponse(f"<h2>{username}/{sitename}/{page}</h2>")