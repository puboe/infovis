class CreatePersonas < ActiveRecord::Migration
  def change
    create_table :personas do |t|
      t.integer :PERSONA_REF_ID
      t.integer :HOGAR_REF_ID
      t.integer :P01
      t.integer :P02
      t.integer :P03
      t.integer :P05
      t.integer :P06
      t.integer :P07
      t.integer :P12
      t.integer :EDADAGRU
      t.integer :EDADQUI
      t.integer :P08
      t.integer :P09
      t.integer :P10
      t.integer :CONDACT

    end
  end
end
