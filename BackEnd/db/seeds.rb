# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

20.times do
  name = Faker::Pokemon.unique.name
  User.create(name: name, password: name)
end

5.times do
  Lecture.create(title: Faker::Pokemon.unique.location, date_time: Faker::Date.forward(60))
end

User.all.each do
  |user|
  user.lectures.push(Lecture.all.sample)
end

Notebook.all.each do
  |notebook|
  notebook.content = Faker::Pokemon.unique.move
  notebook.save
end
