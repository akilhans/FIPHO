from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views
from .views import export_participation_requests, export_detailed_registrations

router = DefaultRouter()
router.register('countries', views.CountryViewSet, basename='country')
router.register('subjects', views.SubjectViewSet, basename='subject')
router.register('roles', views.RoleViewSet, basename='role')
router.register('participation-requests', views.ParticipationRequestViewSet, basename='participationrequest')
router.register('team-leaders', views.TeamLeaderViewSet, basename='teamleader')
router.register('contestants', views.ContestantViewSet, basename='contestant')

urlpatterns = [
    path('participation-requests/export/', export_participation_requests, name='export_participation_requests'),
    path('detailed-registrations/export/', export_detailed_registrations, name='export_detailed_registrations'),
    path('', include(router.urls)),
    path('detailed-registrations/', views.DetailedRegistrationListCreateView.as_view(), name='detailed_registration_list'),
    path('detailed-registrations/<int:pk>/', views.DetailedRegistrationRetrieveUpdateDestroyView.as_view(), name='detailed_registration_detail'),
]
