import django.db.models.deletion
from django.db import migrations, models


def group_existing_people(apps, schema_editor):
    DetailedRegistration = apps.get_model("registration", "DetailedRegistration")
    Delegation = apps.get_model("registration", "Delegation")
    TeamLeader = apps.get_model("registration", "TeamLeader")
    Contestant = apps.get_model("registration", "Contestant")

    for registration in DetailedRegistration.objects.all():
        first_delegation = None
        for position in range(1, max(registration.number_of_teams, 1) + 1):
            name = registration.official_delegation_name
            if position > 1:
                name = f"{name} {position}"
            delegation = Delegation.objects.create(
                registration_id=registration.id,
                official_delegation_name=name,
                position=position,
            )
            if first_delegation is None:
                first_delegation = delegation

        TeamLeader.objects.filter(registration_id=registration.id).update(
            delegation_id=first_delegation.id
        )
        Contestant.objects.filter(registration_id=registration.id).update(
            delegation_id=first_delegation.id
        )


def ungroup_existing_people(apps, schema_editor):
    DetailedRegistration = apps.get_model("registration", "DetailedRegistration")
    Delegation = apps.get_model("registration", "Delegation")
    TeamLeader = apps.get_model("registration", "TeamLeader")
    Contestant = apps.get_model("registration", "Contestant")

    for registration in DetailedRegistration.objects.all():
        first_delegation = Delegation.objects.filter(
            registration_id=registration.id
        ).order_by("position", "id").first()
        if first_delegation is None:
            continue
        registration.official_delegation_name = first_delegation.official_delegation_name
        registration.save(update_fields=["official_delegation_name"])
        TeamLeader.objects.filter(delegation__registration_id=registration.id).update(
            registration_id=registration.id
        )
        Contestant.objects.filter(delegation__registration_id=registration.id).update(
            registration_id=registration.id
        )


class Migration(migrations.Migration):
    dependencies = [
        ("registration", "0002_detailedregistration_number_of_teams"),
    ]

    operations = [
        migrations.CreateModel(
            name="Delegation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("official_delegation_name", models.CharField(max_length=255)),
                ("position", models.PositiveSmallIntegerField()),
                (
                    "registration",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="delegations",
                        to="registration.detailedregistration",
                    ),
                ),
            ],
            options={"ordering": ["position", "id"]},
        ),
        migrations.AlterField(
            model_name="detailedregistration",
            name="official_delegation_name",
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="teamleader",
            name="registration",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="team_leaders",
                to="registration.detailedregistration",
            ),
        ),
        migrations.AlterField(
            model_name="contestant",
            name="registration",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="contestants",
                to="registration.detailedregistration",
            ),
        ),
        migrations.AddField(
            model_name="teamleader",
            name="delegation",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="team_leaders",
                to="registration.delegation",
            ),
        ),
        migrations.AddField(
            model_name="contestant",
            name="delegation",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="contestants",
                to="registration.delegation",
            ),
        ),
        migrations.RunPython(group_existing_people, ungroup_existing_people),
        migrations.RemoveField(
            model_name="detailedregistration",
            name="official_delegation_name",
        ),
        migrations.RemoveField(
            model_name="teamleader",
            name="registration",
        ),
        migrations.RemoveField(
            model_name="contestant",
            name="registration",
        ),
        migrations.AlterField(
            model_name="teamleader",
            name="delegation",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="team_leaders",
                to="registration.delegation",
            ),
        ),
        migrations.AlterField(
            model_name="contestant",
            name="delegation",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="contestants",
                to="registration.delegation",
            ),
        ),
        migrations.AddConstraint(
            model_name="delegation",
            constraint=models.UniqueConstraint(
                fields=("registration", "position"),
                name="unique_delegation_position_per_registration",
            ),
        ),
    ]
