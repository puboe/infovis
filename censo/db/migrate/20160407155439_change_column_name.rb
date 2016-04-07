class ChangeColumnName < ActiveRecord::Migration
  def change
  	rename_column :personas, :PERSONA_REF_ID, :id
  end
end
