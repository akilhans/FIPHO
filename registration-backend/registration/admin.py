from django.contrib import admin
from .models import (
    Contestant,
    Country,
    Delegation,
    DetailedRegistration,
    ParticipationRequest,
    RegistrationFailure,
    Role,
    Subject,
    TeamLeader,
)


admin.site.site_header = "FIPHO Platform Admin"
admin.site.site_title = "FIPHO Platform"
admin.site.index_title = "FIPHO Management"


# ----------------- ADMIN REGISTRATION ----------------- #
@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(ParticipationRequest)
class ParticipationRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name',
                    'country',
                    'role',
                    'subject',
                    'email',
                    'number_of_students',
                    'number_of_team_leaders',
                    'whatsapp_number',
                    'created_at'
                    )
    list_filter = ('role', 'subject', 'country')
    search_fields = ('full_name', 'email', 'whatsapp_number')
    raw_id_fields = ('country', 'role', 'subject')

# Inline classes for TeamLeader and Contestant
class TeamLeaderInline(admin.TabularInline):
    model = TeamLeader
    extra = 0


class ContestantInline(admin.TabularInline):
    model = Contestant
    extra = 0


class DelegationInline(admin.TabularInline):
    model = Delegation
    extra = 0


@admin.register(DetailedRegistration)
class DetailedRegistrationAdmin(admin.ModelAdmin):
    list_display = ('country', 'number_of_teams', 'created_at')
    search_fields = ('country__name', 'delegations__official_delegation_name')
    list_filter = ('country',)
    inlines = [DelegationInline]


@admin.register(Delegation)
class DelegationAdmin(admin.ModelAdmin):
    list_display = ('official_delegation_name', 'registration', 'position')
    search_fields = ('official_delegation_name', 'registration__country__name')
    raw_id_fields = ('registration',)
    inlines = [TeamLeaderInline, ContestantInline]

@admin.register(TeamLeader)
class TeamLeaderAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'badge_name', 'passport_number', 'email', 'phone_number', 'role', 'delegation')
    search_fields = ('full_name', 'badge_name', 'email', 'phone_number', 'passport_number')
    raw_id_fields = ('delegation',)

@admin.register(Contestant)
class ContestantAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'badge_name', 'competition_subject', 'date_of_birth', 'passport_number', 'delegation')
    search_fields = ('full_name', 'badge_name', 'passport_number')
    raw_id_fields = ('delegation',)


@admin.register(RegistrationFailure)
class RegistrationFailureAdmin(admin.ModelAdmin):
    """Read-only log of rejected registration submissions."""

    list_display = ("created_at", "reason", "country_name", "first_error", "ip_address")
    list_filter = ("reason", "country_name")
    search_fields = ("country_name", "ip_address")
    date_hierarchy = "created_at"
    readonly_fields = [field.name for field in RegistrationFailure._meta.fields]

    @admin.display(description="First error")
    def first_error(self, obj):
        if not obj.errors:
            return "-"
        first = obj.errors[0]
        label = f"{first.get('field')}: " if first.get("field") else ""
        more = f" (+{len(obj.errors) - 1} more)" if len(obj.errors) > 1 else ""
        return f"{label}{first.get('message', '')}"[:160] + more

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
