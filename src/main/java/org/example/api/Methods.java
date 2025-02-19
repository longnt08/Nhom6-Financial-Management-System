package org.example.api;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

public interface Methods<T> {
    public List<T> getAll();

    public List<T> getWhere(Predicate<T> predicate);

    public boolean has(T object);

    public boolean has(String ID);

    public void remove(T object);

    public void removeByID(String id);

    public void add(T object);

    public void update(T object);

    public Optional<T> find(Predicate<T> predicate);


}
