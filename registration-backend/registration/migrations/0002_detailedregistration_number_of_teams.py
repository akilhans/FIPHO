from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("registration", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="detailedregistration",
            name="number_of_teams",
            field=models.PositiveSmallIntegerField(
                default=1,
                validators=[MinValueValidator(1), MaxValueValidator(10)],
            ),
        ),
    ]
