
class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_name = db.Column(db.String(100))
    children = db.relationship(
        "Child",
        secondary=tags,
        back_populates="parents")
    def __init__(self, name): 
        self.parent_name = name 

    def __repr__(self):
        return '<Parent %r>' % self.parent_name


class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_name = db.Column(db.String(100))
    parents = db.relationship(
        "Parent",
        secondary=tags,
        back_populates="children")
    def __init__(self, name): 
        self.child_name = name 

    def __repr__(self):
        return '<Child %r>' % self.child_name