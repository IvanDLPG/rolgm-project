# Generated by Django 4.0.8 on 2023-04-19 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_room_room_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='room_id',
            field=models.CharField(blank=True, editable=False, max_length=8, null=True),
        ),
    ]
