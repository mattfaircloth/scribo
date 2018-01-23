# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

20.times do
  User.create(name: Faker::Pokemon.name)
end

20.times do
  Lecture.create(title: Faker::Pokemon.location, date_time: Faker::Date.forward(60))
end

User.all.each do
  |user|
  user.lectures.push(Lecture.all.sample)
  user.lectures.push(Lecture.all.sample)
  user.lectures.push(Lecture.all.sample)
end

Notebook.all.each do
  |notebook|
  notebook.content = Faker::ChuckNorris.fact
  notebook.save
end
