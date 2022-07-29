# Generated by Django 4.0.4 on 2022-06-10 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra', models.CharField(default='', max_length=250)),
                ('mattress', models.CharField(default='', max_length=250)),
                ('button', models.CharField(default='', max_length=250)),
                ('fabric', models.CharField(default='', max_length=250)),
                ('bed_size', models.CharField(default='', max_length=250)),
                ('product', models.CharField(max_length=250)),
                ('username', models.CharField(max_length=20)),
                ('price', models.PositiveIntegerField()),
            ],
        ),
    ]
