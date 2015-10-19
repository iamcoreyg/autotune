class CreateAutotuneLogs < ActiveRecord::Migration
  def change
    create_table :autotune_logs do |t|
      t.string :name, :index => true
      t.text :content
      t.integer :time
      t.integer :project_id, :index => true
      t.integer :blueprint_id, :index => true
      t.datetime :created_at
      t.boolean :success, :default => true
    end

    add_foreign_key :autotune_logs, :autotune_projects, :column => :project_id
    add_foreign_key :autotune_logs, :autotune_blueprints, :column => :blueprint_id
  end
end
