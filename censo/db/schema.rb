# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160407155439) do

  create_table "dpto", id: false, force: :cascade do |t|
    t.integer "DPTO_REF_ID", limit: 4
    t.integer "PROV_REF_ID", limit: 4
    t.text    "IDDPTO",      limit: 65535
    t.integer "DPTO",        limit: 4
    t.text    "NOMDPTO",     limit: 65535
  end

  create_table "personas", force: :cascade do |t|
    t.integer "HOGAR_REF_ID", limit: 4
    t.integer "P01",          limit: 4
    t.integer "P02",          limit: 4
    t.integer "P03",          limit: 4
    t.integer "P05",          limit: 4
    t.integer "P06",          limit: 4
    t.integer "P07",          limit: 4
    t.integer "P12",          limit: 4
    t.integer "EDADAGRU",     limit: 4
    t.integer "EDADQUI",      limit: 4
    t.integer "P08",          limit: 4
    t.integer "P09",          limit: 4
    t.integer "P10",          limit: 4
    t.integer "CONDACT",      limit: 4
  end

end
