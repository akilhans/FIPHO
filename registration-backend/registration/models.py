from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.utils.file_cleanup import register_file_cleanup_signals


# ----------------- GENERAL MODELS ----------------- #
class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# ----------------- PARTICIPATION REQUEST (FIRST STEP) ----------------- #
class ParticipationRequest(models.Model):
    full_name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="participation_requests")
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="participation_requests")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="participation_requests")

    email = models.EmailField(null=True, max_length=70, unique=True)
    whatsapp_number = models.CharField(max_length=20, blank=True, null=True)
    additional_number = models.CharField(max_length=20, blank=True, null=True)

    number_of_students = models.PositiveIntegerField(default=0)
    number_of_team_leaders = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.role.name} ({self.country.name})"


# ----------------- DETAILED REGISTRATION (SECOND STEP) ----------------- #
class DetailedRegistration(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    number_of_teams = models.PositiveSmallIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(10)],
    )

    confirm_information = models.BooleanField(default=False)
    agree_rules = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.country} - {self.number_of_teams} team(s)"


class Delegation(models.Model):
    registration = models.ForeignKey(
        DetailedRegistration,
        on_delete=models.CASCADE,
        related_name="delegations",
    )
    official_delegation_name = models.CharField(max_length=255)
    position = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ["position", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["registration", "position"],
                name="unique_delegation_position_per_registration",
            )
        ]

    def __str__(self):
        return f"{self.official_delegation_name} - {self.registration.country}"


class TeamLeader(models.Model):
    delegation = models.ForeignKey(Delegation, on_delete=models.CASCADE, related_name="team_leaders")
    full_name = models.CharField(max_length=255)
    badge_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=30, blank=True, null=True)
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    role = models.CharField(max_length=50)
    t_shirt_size = models.CharField(max_length=10, blank=True, null=True)
    food_type = models.CharField(max_length=30, blank=True, null=True)
    dietary_requirements = models.TextField(blank=True, null=True)
    passport_scan = models.FileField(upload_to="uploads/team_leaders/passports/", blank=True, null=True)
    id_photo = models.ImageField(upload_to="uploads/team_leaders/photos/", blank=True, null=True)
    consent_form = models.FileField(upload_to="uploads/team_leaders/consents/", blank=True, null=True)

    def __str__(self):
        return f"Team Leader: {self.full_name} ({self.role})"


class Contestant(models.Model):
    delegation = models.ForeignKey(Delegation, on_delete=models.CASCADE, related_name="contestants")
    full_name = models.CharField(max_length=255)
    badge_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=20, blank=True, null=True)
    competition_subject = models.CharField(max_length=50, default="Physics")

    passport_number = models.CharField(max_length=50)
    passport_expiry_date = models.DateField()
    t_shirt_size = models.CharField(max_length=10, blank=True, null=True)
    food_type = models.CharField(max_length=30, blank=True, null=True)
    dietary_requirements = models.TextField(blank=True, null=True)
    special_requirements = models.TextField(blank=True, null=True)

    passport_scan = models.FileField(upload_to="uploads/contestants/passports/", blank=True, null=True)
    id_photo = models.ImageField(upload_to="uploads/contestants/photos/", blank=True, null=True)
    commitment_form = models.FileField(upload_to="uploads/contestants/commitments/", blank=True, null=True)
    consent_form = models.FileField(upload_to="uploads/contestants/consents/", blank=True, null=True)
    parental_consent_form = models.FileField(upload_to="uploads/contestants/consents/", blank=True, null=True)

    def __str__(self):
        return f"Contestant: {self.full_name} ({self.competition_subject if self.competition_subject else 'N/A'})"


register_file_cleanup_signals(TeamLeader, ["passport_scan", "id_photo", "consent_form"])
register_file_cleanup_signals(
    Contestant,
    ["passport_scan", "id_photo", "commitment_form", "consent_form", "parental_consent_form"],
)
